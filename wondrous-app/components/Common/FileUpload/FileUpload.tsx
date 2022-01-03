import React, { useRef, useState } from 'react'

import { FileUploadInput } from './styles'

const FileUpload = (props) => {
	const { updateFilesCb, ...otherProps } = props

	const fileInputField = useRef(null)
	const [files, setFiles] = useState({ file: null })

	const addNewFiles = (newFiles) => {
		for (let file of newFiles) {
			// if (file.size <= maxFileSizeInBytes) {
			if (!otherProps.multiple) {
				return { file }
			}
			files[file.name] = file
			// }
		}
		return { ...files }
	}

	const callUpdateFilesCb = (files) => {
		const filesAsArray = Object.values(files)
		const newFiles = otherProps.multiple ? filesAsArray : filesAsArray[0]
		if (newFiles) {
			updateFilesCb(newFiles)
		}
	}

	const handleNewFileUpload = (e) => {
		const { files: newFiles } = e.target
		if (newFiles.length) {
			const updatedFiles = addNewFiles(newFiles)
			setFiles(updatedFiles)

			console.log('updatedFiles', updatedFiles)
			callUpdateFilesCb(updatedFiles)
		}
	}

	return (
		<FileUploadInput
			type="file"
			ref={fileInputField}
			onChange={handleNewFileUpload}
			{...otherProps}
		/>
	)
}

export default FileUpload