import Vue, { CreateElement } from 'vue';
import { Row, FlatRow, Column } from '@/types/billQuery';
import { tooltip } from '@/directives/tooltip/tooltip';

Vue.directive('tooltip', tooltip);

export function translateBody(
  body: Array<Row>,
  indexer: number = 0,
  visibile: boolean = true,
  parent: number = -1
): Array<FlatRow> {
  if (!body) return [];

  const rs: Array<FlatRow> = [];

  for (const row of body) {
    rs.push({
      ...row,
      _parent: parent,
      _children: row.children ? row.children.length : 0,
      _child_index: indexer,
      _status: visibile,
    });

    if (row.children) rs.push(...translateBody(row.children, indexer + 1, false, parent + rs.length));
  }

  return rs;
}

export function translateHeader(
  header: Array<Column>,
  hasChildren: boolean,
  find: (offset: number) => FlatRow
): Array<Column> {
  for (let i = 0; i < header.length; ++i) {
    const h = header[i];
    const render = typeof h.render === 'string' ? new Function('h', 'params', h.render) : h.render;
    h.className = `key-${h.key}`;

    if (hasChildren && i === 0) h.className = `has-child ${h.className}`;

    h.render = (h: CreateElement, { row, column, index }: { row: FlatRow; column: Column; index: number }) => {
      return h(
        'div',
        {
          class: 'ivu-table-cell-ellipsis',
          directives: [
            {
              name: 'tooltip',
              value: {
                container: 'tbody',
                content: row[column.key],
              },
            },
          ],
        },
        [
          hasChildren && i === 0
            ? h('Icon', {
                props: {
                  type:
                    row._children !== 0
                      ? find(row._children + index)._status
                        ? 'md-arrow-dropdown'
                        : 'md-arrow-dropright'
                      : 'ios-more',
                  size: 24,
                  color: row._children === 0 ? 'transparent' : '',
                },
                class: `indent indent-${row._child_index}`,
              })
            : undefined,
          render && typeof render === 'function' ? render(h, { row, column, index }) : h('span', row[column.key]),
        ]
      );
    };

    //   return h(
    //     'Tooltip',
    //     {
    //       props: {
    //         content: row[column.key],
    //         maxWidth: 400,
    //         placement: 'bottom-start',
    //         transfer: true,
    //       },
    //       class: 'ivu-table-cell-tooltip',
    //     },
    //     [
    //       h(
    //         'div',
    //         {
    //           class: 'ivu-table-cell-tooltip-content',
    //         },
    //         [
    //           hasChildren && i === 0
    //             ? h('Icon', {
    //                 props: {
    //                   type:
    //                     row._children !== 0
    //                       ? find(row._children + index)._status
    //                         ? 'md-arrow-dropdown'
    //                         : 'md-arrow-dropright'
    //                       : 'ios-more',
    //                   size: 24,
    //                   color: row._children === 0 ? 'transparent' : '',
    //                 },
    //                 class: `indent indent-${row._child_index}`,
    //               })
    //             : undefined,
    //           render && typeof render === 'function' ? render(h, { row, column, index }) : h('span', row[column.key]),
    //         ]
    //       ),
    //     ]
    //   );
    // };
  }

  return header;
}
