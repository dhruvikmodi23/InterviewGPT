import { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPlay, FaTrash } from 'react-icons/fa';

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setAudioBlob(blob);
        onRecordingComplete(blob);
        audioChunksRef.current = [];
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const clearRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setAudioURL('');
    setAudioBlob(null);
    onRecordingComplete(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Voice Explanation</h3>
      
      <div className="flex flex-col space-y-4">
        {!audioURL ? (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center justify-center px-4 py-2 rounded-md text-white ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-500 hover:bg-primary-600'
            } transition-colors`}
          >
            {isRecording ? (
              <>
                <FaStop className="mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <FaMicrophone className="mr-2" />
                Start Recording
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayback}
              className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              {isPlaying ? (
                <>
                  <FaStop className="mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <FaPlay className="mr-2" />
                  Play
                </>
              )}
            </button>
            <button
              onClick={clearRecording}
              className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              <FaTrash className="mr-2" />
              Clear
            </button>
          </div>
        )}

        {audioURL && (
          <div className="mt-2">
            <audio
              ref={audioRef}
              src={audioURL}
              onEnded={() => setIsPlaying(false)}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              Recording duration: {audioRef.current?.duration.toFixed(1) || '0'} seconds
            </div>
          </div>
        )}

        {isRecording && (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-gray-600">Recording in progress...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;