import 'katex/dist/katex.min.css';
import { RichTextEditor } from './components/Editor/RichTextEditor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Rich Text Editor</h1>
        <RichTextEditor />
      </div>
    </div>
  );
}

export default App;