import styled from "styled-components";

export const Container = styled.ul`
  margin-top: 0px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: left;
    color: #444;
    & + li {
      margin-top: 1px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: rigth;
  div {
    display: flex;
    flex-direction: column;
    span {
      font-size: 10px;
      color: #999;
      margin-top: 1px;
      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

export const Preview = styled.div`
width: 105px !important;
height: 119px !important;
margin-top: -11px;
border-radius: 13px;
background-image: url();
background-repeat: no-repeat;
background-size: cover;
background-position: 20% 20%;
margin-left: 10px;
`;
