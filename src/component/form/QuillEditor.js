// components/QuillEditor.js
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const QuillEditor = ({ value, onChange }) => {
  return (
    <ReactQuill value={value} onChange={onChange} theme="snow" />
  );
};

export default QuillEditor;
