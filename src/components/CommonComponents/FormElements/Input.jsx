import React from 'react'




export const Input = React.memo(({ type, title, name, options, accept="*/*", classNames }) => {

    if (!classNames) classNames = ""
    if (!type) type = ""

    let inputToRender;
    switch (type) {
        case "file": inputToRender = <FileInput name={name} accept={accept} classNames={classNames} />
            break;
        case "textarea": inputToRender = <TextArea name={name} title={title} classNames={classNames} />
            break;
        default: inputToRender = <DefaultInput type={type} name={name} title={title} classNames={classNames} />
            break;
    }

    return (
        <div className="form-control w-full mt-4">
            <label className="label capitalize">
                <span className="label-text">{title}</span>
            </label>
            {inputToRender}
        </div>
    )
}
)


const FileInput = ({name, classNames, accept}) => {
    return (
        <input
            type="file"
            name={name}
            accept={accept}
            className={"file-input file-input-bordered file-input-primary w-full " + classNames}
        />
    )
}


const TextArea = ({name, title, classNames}) => {
    return (
        <textarea
            name={name}
            className={"textarea textarea-primary " + classNames}
            placeholder={`Enter ${title}`}
            required
        >
        </textarea>
    )
}

const DefaultInput = ({type, name, title, classNames}) => {
    return (
        <input
            type={type}
            name={name}
            id={name}
            placeholder={`Enter ${title}`}
            className={"input input-primary w-full capitalize " + classNames}
            required
        />
    )
}