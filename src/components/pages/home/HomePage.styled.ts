import styled from "styled-components";

const HomePageWrapper = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  > div > div > div {
    flex-grow: 1;
  }
`;
export default HomePageWrapper;
