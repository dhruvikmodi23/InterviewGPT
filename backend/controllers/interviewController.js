// controllers/interviewController.js
const Interview = require('../models/Interview');
const { executeCode } = require('../services/codeExecutionService');
const { analyzeSpeech } = require('../services/speechAnalysisService');
const { generateFeedback } = require('../services/feedbackService');

exports.startInterview = async (req, res) => {
  try {
    // In a real implementation, you would fetch a question from your database
    // or from LeetCode's API based on difficulty level
    const question = {
      questionId: 'lc-1',
      title: 'Two Sum',
      difficulty: 'easy',
      category: 'Array'
    };

    const newInterview = await Interview.create({
      user: req.user._id,
      question: question,
      status: 'in-progress'
    });

    res.status(201).json({
      status: 'success',
      data: {
        interview: newInterview
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.submitCode = async (req, res) => {
  try {
    const { interviewId, code, language } = req.body;
    
    // Execute code using Judge0 API or your code execution service
    const executionResult = await executeCode(code, language);
    
    // Get speech analysis if audio was submitted
    let speechAnalysis = null;
    if (req.body.audioData) {
      speechAnalysis = await analyzeSpeech(req.body.audioData);
    }

    // Generate overall feedback
    const feedback = await generateFeedback({
      codeExecution: executionResult,
      speechAnalysis: speechAnalysis
    });

    // Calculate overall score (simple weighted average example)
    const codeScore = (executionResult.testCasesPassed / executionResult.totalTestCases) * 70;
    const speechScore = speechAnalysis ? speechAnalysis.clarityScore * 0.3 : 0;
    const overallScore = Math.min(100, codeScore + speechScore);

    const updatedInterview = await Interview.findByIdAndUpdate(
      interviewId,
      {
        codeExecution: {
          code,
          language,
          testCasesPassed: executionResult.testCasesPassed,
          totalTestCases: executionResult.totalTestCases,
          executionTime: executionResult.executionTime
        },
        speechAnalysis: speechAnalysis,
        feedback,
        overallScore,
        status: 'completed',
        completedAt: Date.now()
      },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        interview: updatedInterview
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user._id })
      .sort('-startedAt')
      .select('-codeExecution.code -speechAnalysis.transcript');

    res.status(200).json({
      status: 'success',
      results: interviews.length,
      data: {
        interviews
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!interview) {
      return res.status(404).json({
        status: 'fail',
        message: 'No interview found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        interview
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};