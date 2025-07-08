import { useState, useEffect, useRef } from 'react'
import { startInterview, submitInterview } from '../api/interviews'
import CodeEditor from '../components/CodeEditor'
import VoiceRecorder from '../components/VoiceRecorder'
import QuestionPanel from '../components/QuestionPanel'

const Interview = () => {
  const [interview, setInterview] = useState(null)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [audioBlob, setAudioBlob] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState('')
  const editorRef = useRef(null)

  useEffect(() => {
    const initInterview = async () => {
      setIsLoading(true)
      try {
        const { data } = await startInterview()
        setInterview(data.interview)
        setCode('// Write your solution here')
      } catch (err) {
        console.error('Failed to start interview', err)
      }
      setIsLoading(false)
    }
    initInterview()
  }, [])

  const handleSubmit = async () => {
    if (!interview) return
    
    setIsLoading(true)
    try {
      const { data } = await submitInterview(
        interview._id, 
        code, 
        language, 
        audioBlob
      )
      setFeedback(data.interview.feedback)
    } catch (err) {
      console.error('Submission failed', err)
    }
    setIsLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Technical Interview</h2>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 disabled:opacity-50"
        >
          Submit Interview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuestionPanel question={interview?.question} />
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Code Solution</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          
          <CodeEditor 
            ref={editorRef}
            language={language}
            code={code}
            onChange={setCode}
          />

          <VoiceRecorder onRecordingComplete={setAudioBlob} />
        </div>
      </div>

      {feedback && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Feedback</h3>
          <div className="text-gray-700 whitespace-pre-wrap">{feedback}</div>
        </div>
      )}
    </div>
  )
}

export default Interview