import React from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Page = ({ onChangeEditor }) => {

    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => onChangeEditor(editor.getData())}
                className="border border-black rounded-[10px] px-4 py-2.5"
            />
        </>
    )
}

export default Page;