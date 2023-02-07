import styled from 'styled-components';

export const CategoriesWrapper = styled.div`
    background: ${(props) => props.theme.darkWhite};
    padding-top: 15px;
    padding-bottom: 15px;
 `

export const CategoryWrapper = styled.div`
  border-radius: 50%;
  min-width: 150px;
  min-height: 150px;  
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right:15px;
  margin-left: 15px;
  
  @media (max-width: 1200px) {
    background-image: none;
    min-width: unset;
    min-height: unset;  
  }
 `