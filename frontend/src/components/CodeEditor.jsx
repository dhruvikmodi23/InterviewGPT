// src/components/CodeEditor.jsx
import Editor from '@monaco-editor/react'
import { useTheme } from '../context/ThemeContext'

const CodeEditor = ({ language, code, onChange }, ref) => {
  const { isDark } = useTheme()

  return (
    <div className="h-96 border border-gray-300 rounded-md overflow-hidden">
      <Editor
        height="100%"
        language={language}
        theme={isDark ? 'vs-dark' : 'light'}
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
