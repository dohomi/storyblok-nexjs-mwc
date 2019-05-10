import SbEditable from 'storyblok-react'
import clsx from 'clsx'

const TableColumn = ({content}) => {
  return (
    <td>
      {content}
    </td>
  )
}


const TableRow = ({content = []}) => {
  return (
    <tr>
      {content.map((column, index) => <TableColumn key={`column_${index}`} index={index} content={column}/>)}
    </tr>
  )
}

const Table = ({content}) => {

  const className = clsx('lm-table', content.class_names && content.class_names.values, {
    [`lm-table__${content.variant}`]: !!content.variant
  })
  const tableBody = content.body && content.body.tbody || []
  const tableHead = content.body && content.body.thead || []

  return (
    <SbEditable content={content}>
      <table className={className}>
        {!content.disable_table_head && (<thead>
        <tr>
          {tableHead.map((content, index) => <th key={`head_${index}`}>{content}</th>)}
        </tr>
        </thead>)}
        <tbody>
        {tableBody.map((row, index) => <TableRow key={`row_${index}`} index={index} content={row}/>)}
        </tbody>
      </table>

    </SbEditable>
  )
}

export default Table
