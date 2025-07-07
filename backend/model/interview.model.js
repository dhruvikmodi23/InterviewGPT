const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const CodeExecutionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  testCasesPassed: {
    type: Number,
    required: true
  },
  totalTestCases: {
    type: Number,
    required: true
  },
  executionTime: {
    type: Number
  }
});

const SpeechAnalysisSchema = new mongoose.Schema({
  transcript: {
    type: String
  },
  clarityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  fillerWords: {
    type: Number
  },
  sentimentAnalysis: {
    type: String
  }
});

const InterviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: QuestionSchema,
    required: true
  },
  codeExecution: {
    type: CodeExecutionSchema,
    required: true
  },
  speechAnalysis: {
    type: SpeechAnalysisSchema
  },
  feedback: {
    type: String
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  }
});

// Index for faster querying user's interviews
InterviewSchema.index({ user: 1 });

const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = Interview;