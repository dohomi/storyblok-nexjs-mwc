import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import { FunctionComponent } from 'react'
import { TableStoryblok } from '../../typings/generated/components-schema'


const TableRow: FunctionComponent<{ content: string[], index: number }> = ({ content, index }) => {
  return (
    <tr>
      {content.map((column: string, iterator: number) => <td key={`column_${index}_${iterator}`}
                                                             dangerouslySetInnerHTML={{ __html: column }} />)}
    </tr>
  )
}

const Table: FunctionComponent<{ content: TableStoryblok }> = ({ content }) => {

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
        {tableBody.map((row, index) => <TableRow
          key={`row_${index}`}
          index={index}
          content={row} />)}
        </tbody>
      </table>

    </SbEditable>
  )
}

export default Table
