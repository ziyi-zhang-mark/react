import { Tabs } from './Tabs';

import './styles.css';

export default function App() {
  const items = [{
    label: "HTML",
    value: "html",
    content: `The HyperText Markup Language or HTML is the 
      standard markup language for documents designed to
      be displayed in a web browser.`
  }, {
    label: "CSS",
    value: "css",
    content: `Cascading Style Sheets is a style sheet language
      used for describing the presentation of a document
      written in a markup language such as HTML or XML.`
  }, {
    label: "Javascript",
    value: "javascript",
    content: `JavaScript, often abbreviated as JS, is a
      programming language that is one of the core
      technologies of the World Wide Web, alongside HTML and CSS.`
  }]
  return <Tabs items={items} />;
}
