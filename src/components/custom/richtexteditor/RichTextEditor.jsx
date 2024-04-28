import React from 'react'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module-react';
import PropTypes from 'prop-types'
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize',ImageResize);

const defaultRichEditorModule = {
    toolbar: [
        [{ header: [1,2,3,4,5,6,false] }, { font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' }
        ],
        ['link', 'image'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
      }
}

const defaultFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const defaultEditorStyled = {
    width: '100%', 
    height: '450px', 
    paddingBottom: '50px '
}

const RichTextEditor = (props) => {

    const contentValueHandler = (value) => {
        props.onChangeContent(value);
    }

  return (
    <ReactQuill 
        theme='snow' 
        modules={defaultRichEditorModule} 
        formats={defaultFormats} 
        style={defaultEditorStyled}
        value={props.value}
        onChange={contentValueHandler}
    />
  );
}

RichTextEditor.propTypes = {
    onChangeContent: PropTypes.func,
    value: PropTypes.string,
}

export default RichTextEditor
