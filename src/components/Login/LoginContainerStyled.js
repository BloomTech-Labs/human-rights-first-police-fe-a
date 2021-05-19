import styled from 'styled-components';
import statueOfLiberty from './statueOfLiberty.jpg';

export const StyledLogin = styled.div`
  display: flex;
  justify-content: space-between;
  .background-image {
    background-image: url(${statueOfLiberty});
    width: 55vw;
    height: 100vh;
    background-position: center;
    background-size: cover;
  }
  #sign-in-widget {
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding-bottom: 20%;
    #okta-sign-in.auth-container.main-container {
      font-family: Helvetica, Arial, sans-serif;
    }
    .o-form-head {
      font-size: 2.4rem;
    }
    .button-primary {
      background: #bc541e;
      border: 1px solid #d39460;
    }
    .button-primary:hover {
      background: #d39460;
      border: 1px solid #d39460;
    }
    .auth-footer {
      display: none;
    }
    .content-container {
      display: none;
    }
  }
`;
