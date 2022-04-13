import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  margin: 1.4rem 0;
  font-size: 1rem;
  min-width: 400px;
  border-radius: 0.6rem 0.6rem 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`

export const TableHeaderRow = styled.tr`
  background-color: #3D3AEF;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
`

export const TableHeading = styled.th`
  padding: 0.8rem 1rem;
`

export const TableContentRow = styled.tr`
  border-bottom: 1px solid #dddddd;

  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  &:last-of-type {
    border-bottom: 2px solid #003777;
  }
`

export const TableField = styled.td`
  padding: 0.8rem 1rem;
`