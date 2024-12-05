import { Box, Chip, ListItem, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const TagChip = withTheme(styled(Chip)`
  padding: ${(props) => props.theme.spacing(2.5)}px
    ${(props) => props.theme.spacing(0.5)}px;
  border-radius: 15px;
  max-width: 100%;
  text-overflow: ellipsis;
  font-size: ${(props) => props.theme.spacing(2)}px;
  margin: ${(props) => props.theme.spacing(1)}px;
`)

export const LocationsListItem = withTheme(styled(ListItem)`
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  border: 1px solid rgb(0 0 0 / 16%);
  margin-bottom: ${(props) => props.theme.spacing(1.2)}px;
`)

export const StopsBox = withTheme(styled(Box)<{ isLaptop: boolean }>`
  margin-top: ${(props) => props.theme.spacing(1.5)}px;
  min-width: ${(props) => props.theme.spacing(25)}px;
  overflow: auto;
  max-height: ${(props) => props.theme.spacing(6.2)}vh;
  .MuiList-root {
    display: inline;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 25%;
    margin-top: 0px;
    max-height: ${(props) => (props.isLaptop ? '35vh' : '45vh')};
    margin-left: ${(props) => props.theme.spacing(2)}px;
    .MuiListItemSecondaryAction-root {
      top: 28%;
      ${(props) => props.theme.breakpoints.up('md')} {
        top: 50%;
      }
    }
  }
  ${(props) => props.theme.breakpoints.between('md', 'lg')} {
    width: 40%;
  }
`)
export const ListRespBox = withTheme(styled(Box)`
display: flex;
flex-direction: column;
justify-content: space-between;
${(props) => props.theme.breakpoints.up('md')} {
  display: flex;
  flex-direction: row;
}
  }
`)
export const BottomInfoBox = withTheme(styled(Box)`
text-align: center;
max-width: 100%;
margin: ${(props) => props.theme.spacing(1)}px;
${(props) => props.theme.breakpoints.up('md')} {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
}
  }
`)

export const BottomOptionBox = withTheme(styled(Box)`
  ${(props) => props.theme.breakpoints.up('md')} {
    margin: ${(props) => props.theme.spacing(2)}px;
  }
`)

export const TagBox = withTheme(styled(Box)`
  ${(props) => props.theme.breakpoints.down('sm')} {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.spacing(2)}px;
    list-style: none;
    padding: 0;
    margin-top: 0;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    display: flex;
    max-width: 40vw;
    overflow: auto;
    flex-wrap: no-wrap;
  }
`)
