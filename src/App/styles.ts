import styled, { css } from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 100%;
  background-color: #f2f3f5;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  border-bottom: 1px solid lightgray;
  padding-top: 0.5em;
  height: 4rem;
`;

export const Body = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const List = styled.ul`
  width: min(95%, 600px);
  height: 100%;
  max-height: 80%;
  border-radius: 5px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  padding: 5px 8px;
  position: relative;
  overflow: hidden;
`;

export const InputContianer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  min-height: 3rem;
`;

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TodoList = styled.ul`
  width: 100%;
  padding: 5px;
  list-style: none;
  overflow-y: auto;
  scroll-behavior: smooth;
  ${(props: { empty: boolean }) =>
    props.empty &&
    css`
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    `}

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: lightgray;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #718096;
  }
`;

export const TodoItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid #cbd5e0;
  padding: 5px 8px;

  &:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

export const TodoDescription = styled.p`
  color: #2d3748;
  font-size: 1rem;
`;

export const TodoText = styled.div`
  flex: 1;
  padding-right: 0.5rem;
  width: 70%;
  display: flex;
  align-items: center;
`;

export const TodoControl = styled.div`
  flex: 1;
  max-width: 3rem;
  min-width: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 5px;
  gap: 5px;
`;

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f2f3f5;
  z-index: 1000;
`;

export const Placeholder = styled.p`
  color: #888888;
  text-align: center;
  padding: 0 1rem;
`;
