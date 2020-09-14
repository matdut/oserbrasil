import styled from "styled-components";

export const Container = styled.ul`
  margin-top: 0px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    & + li {
      margin-top: 1px;
    }
  }
`;

export const FileInfo = styled.div`
  display: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    heigth: 200px;
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
  width: 253px;
  height: 264px;
  border-radius: 13px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 40% 40%;
  margin-right: 10px;  
  margin-left: 41px;
`;
