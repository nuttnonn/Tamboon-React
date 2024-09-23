import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: "Open Sans", sans-serif;
        background-color: #f5f5f5;
        color: #686f89;
    }

    h1 {
        color: #173799;
        text-align: center;
        font-weight: bold;
        margin: 1.5em 0 0.75em 0;
        
        @media (max-width: 440px) {
            font-size: 1.75rem;
            margin: 0.75em 0;
        }
    }
    
    h2 {
        font-size: 16px;
        font-weight: 500;
    }
`;

export default GlobalStyles;