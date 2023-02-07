import styled from 'styled-components';

export const CategoriesWrapper = styled.div`
    background: ${(props) => props.theme.darkWhite}
 `

export const CategoryWrapper = styled.div`
  border-radius: 4px;
  min-width: 220px;
  min-height: 220px;  
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  
  @media (max-width: 1200px) {
    background-image: none;
    min-width: unset;
    min-height: unset;  
  }
 `