import SbEditable from 'storyblok-react';
import clsx from 'clsx';
var TableRow = function (_a) {
    var content = _a.content, index = _a.index;
    return (<tr>
      {content.map(function (column, iterator) { return <td key={"column_" + index + "_" + iterator} dangerouslySetInnerHTML={{ __html: column }}/>; })}
    </tr>);
};
var Table = function (_a) {
    var _b;
    var content = _a.content;
    var className = clsx('lm-table', content.class_names && content.class_names.values, (_b = {},
        _b["lm-table__" + content.variant] = !!content.variant,
        _b));
    var tableBody = content.body && content.body.tbody || [];
    var tableHead = content.body && content.body.thead || [];
    return (<SbEditable content={content}>
      <table className={className}>
        {!content.disable_table_head && (<thead>
        <tr>
          {tableHead.map(function (content, index) { return <th key={"head_" + index}>{content}</th>; })}
        </tr>
        </thead>)}
        <tbody>
        {tableBody.map(function (row, index) { return <TableRow key={"row_" + index} index={index} content={row}/>; })}
        </tbody>
      </table>

    </SbEditable>);
};
export default Table;
