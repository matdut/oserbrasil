import styled from "styled-components";

export const Container = styled.ul`
  margin-top: 5px;
  padding: 5px !important;
  max-width: 0px !important;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    & + li {
      margin-top: 2px;
    }
  }
`;

export const FileInfo = styled.div`
  display: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    span {
      font-size: 12px;
      color: #999;
      margin-top: 2px;
      button {
        border: 2;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

export const Preview = styled.div`
width: 230px;
height: 206px;
  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 10% 10%;
  margin-right: 2px; 
 
`;