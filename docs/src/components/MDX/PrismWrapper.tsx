import React from "react"

import { useTheme } from "@startpage/theming"
import Highlight, { defaultProps } from "prism-react-renderer"

import { getPrismTheme } from "./prism-theme"

type Props = { children: string, className?: string }

export const PrismWrapper = ({ className, ...props }: Props) => {
  const [theme] = useTheme()
  const language = className?.replace("language-", "") as "scss"
  return (
    <Highlight
      {...defaultProps}
      theme={getPrismTheme(theme)}
      code={props.children}
      language={language || "tsx"}
    >
      {({ tokens, getLineProps, getTokenProps }) =>
        tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))
      }
    </Highlight>
  )
}
