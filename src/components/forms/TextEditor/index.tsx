import { FC, memo, useEffect, useRef } from 'react'

const TextEditor: FC = () => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadEditor = async () => {
      // @ts-ignore
      import('medium-editor/dist/css/medium-editor.min.css')
      // @ts-ignore
      import('medium-editor/dist/css/themes/beagle.min.css')

      const MediumEditor = await import('medium-editor')

      const editor = new MediumEditor.default(editorRef.current!, {
        delay: 0,
        disableEditing: false,
      })

      editor.subscribe('editableInput', () => {
        // console.log(editor.getContent())
      })
    }

    loadEditor()
  }, [])

  return (
    <div className="flex p-4 bg-black/5 dark:bg-dark-white/5 rounded-lg min-h-[280px] max-h-[420px]">
      <main
        ref={editorRef}
        contentEditable
        id="Editor"
        dangerouslySetInnerHTML={{ __html: '' }}
        className="focus-within:outline-none duration-0 flex-1 min-h-[280px] default-headings default-lists overflow-auto pr-4 text-lg"
      />
    </div>
  )
}

export default memo(TextEditor)
