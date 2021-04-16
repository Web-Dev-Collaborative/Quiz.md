import React from 'react'
import ReactMarkdown from "react-markdown";
import styles from './styles.module.css'
import gfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const renderers = {
    code: ({language, value}) => {
      return <SyntaxHighlighter style={atomDark} language={language} children={value} />
    }
  }

const BackComponent = ({content,flipToggle,setFlipToggle}) => {
	
    return (
    <div onClick={() =>setFlipToggle(!flipToggle)} className={styles.card }>
	<div className={styles.contentContainer}>
			<ReactMarkdown renderers={renderers} allowDangerousHtml={true} source={content} plugins={[gfm]}  >
				{/* <Speech
					style={speechStyle}
					stop={true}
					pause={true}
					resume={true}
					text="I have altered my voice"
					voice="Google UK English Female"
				/> */}
					{content}
					</ReactMarkdown>
			</div>
		</div>
	);
};

export default BackComponent