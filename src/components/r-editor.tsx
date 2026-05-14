"use client"

import React, { useRef } from "react"
import Editor, { useMonaco } from "@monaco-editor/react"

interface REditorProps {
  initialValue?: string
  height?: string
  readOnly?: boolean
}

export function REditor({ initialValue = "", height = "400px", readOnly = false }: REditorProps) {
  const monaco = useMonaco()

  // Opcionalmente podemos configurar un tema premium para Monaco Editor
  React.useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("finlabDark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "6A9955" },
          { token: "keyword", foreground: "C586C0" },
          { token: "string", foreground: "CE9178" },
          { token: "number", foreground: "B5CEA8" },
        ],
        colors: {
          "editor.background": "#0F172A", // Tailwind slate-900
          "editor.lineHighlightBackground": "#1E293B", // slate-800
        },
      })
      monaco.editor.setTheme("finlabDark")
    }
  }, [monaco])

  return (
    <div className="rounded-md overflow-hidden border">
      <Editor
        height={height}
        defaultLanguage="r"
        defaultValue={initialValue}
        theme="finlabDark"
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-mono)",
          lineHeight: 24,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
        }}
      />
    </div>
  )
}
