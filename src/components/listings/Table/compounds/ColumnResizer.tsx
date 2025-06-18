import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { MouseEventHandler, RefObject } from 'react';
import { useRef, useState } from 'react';

import { useTableContext } from '../contexts';
import type { ColumnResizingData } from '../types';

import styles from '../styles.module.scss';

export type ColumnResizerProps = {
  column: RefObject<HTMLTableCellElement>;
  headerTextWidth?: number;
  minWidth?: number;
  userCanPin?: boolean;
};

export const ColumnResizer = ({
  column,
  headerTextWidth,
  minWidth,
  userCanPin,
}: ColumnResizerProps) => {
  const mousePositionOnMouseDown = useRef(0);
  const widthOnMouseDown = useRef(0);

  const { tableRef, setColumnsResizingData, elasticColumnKey } =
    useTableContext();

  const [isResizing, setIsResizing] = useState(false);

  const updateColumnsResizingData = () => {
    if (tableRef?.current && tableRef.current.parentElement) {
      const tableWidth = tableRef.current.getBoundingClientRect().width;
      const parentWidth =
        tableRef.current.parentElement.getBoundingClientRect().width;
      const tableHeaders = tableRef.current.querySelectorAll('th');

      const updatedResizingData: ColumnResizingData = {};

      tableHeaders.forEach(header => {
        const key = header.id.replace('header-', '');
        const width = header.offsetWidth;
        if (key === elasticColumnKey && tableWidth < parentWidth) {
          const remainingWidth = parentWidth - tableWidth;
          const newWidth = width + remainingWidth;
          updatedResizingData[key] = {
            ...(updatedResizingData[key] || {}),
            width: newWidth,
          };
        } else {
          updatedResizingData[key] = {
            ...(updatedResizingData[key] || {}),
            width,
          };
        }
      });

      setColumnsResizingData(updatedResizingData);
    }
  };

  const mouseDownHandler: MouseEventHandler = e => {
    setIsResizing(true);
    mousePositionOnMouseDown.current = e.clientX;

    if (column.current) {
      const styles = window.getComputedStyle(column.current);
      widthOnMouseDown.current = parseInt(styles.width, 10);
    }

    updateColumnsResizingData();

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!tableRef?.current) return;

    if (column.current) {
      column.current.style.maxWidth = '';
    }

    // Determine how far the mouse has been moved
    const dx = e.clientX - mousePositionOnMouseDown.current;

    const pinActionsButtonWidth = 36;
    const headerMargin = 30;

    const headerTextWidthWithMargin = headerTextWidth
      ? headerTextWidth +
        headerMargin +
        (userCanPin ? pinActionsButtonWidth : 0)
      : 0;

    const minimumWidth = minWidth ? minWidth : headerTextWidthWithMargin;

    if (column.current) {
      const columnMinWidth = 36;
      column.current.style.width = `${Math.max(
        widthOnMouseDown.current + dx,
        columnMinWidth,
        minimumWidth,
      )}px`;
    }
  };

  const mouseUpHandler = () => {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    updateColumnsResizingData();
    setIsResizing(false);
  };

  if (!column.current) return;

  return (
    <>
      <div
        className={classNames(
          styles.columnResizer,
          isResizing && styles.resizing,
        )}
      ></div>
      <div
        className={classNames(styles.resizerArea)}
        onMouseDown={mouseDownHandler}
      ></div>
    </>
  );
};
