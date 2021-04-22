import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { If, Then, Else, When } from 'react-if';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

class CustomizedTable extends React.Component {
  
  state = { showing: true };
  
  render(){

    const { showing } = this.state;

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
    
    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);
    
    const rows = this.props.productList;

    const selectProductToDelete = (xiProduct) => {
      return (this.props.selectProduct(xiProduct, ''));
    }

    const editProduct = (xiProduct) => {
      this.setState({ showing: !showing });
      return (this.props.selectProduct(xiProduct));
    }

    const confirmEditProduct = () => {

    }

    const deleteProduct = (xiProduct) => {
      return (this.props.selectProduct(xiProduct, "delete"));
    }

    const cancelDeleteProduct = () =>{
      return (this.props.selectProduct({}));
    }

    const confirmDeleteProduct = (xiProduct, info) => {
      return (this.props.selectProduct(xiProduct, ''));
    }

    return (

      <TableContainer component={Paper}>
        {showing ?
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Nome do Produto</StyledTableCell>
                <StyledTableCell align="left">Descrição</StyledTableCell>
                <StyledTableCell align="right">Preço&nbsp;(R$)</StyledTableCell>
                <StyledTableCell align="right">Quantidade</StyledTableCell>
                <StyledTableCell align="center">Situação</StyledTableCell>
                <StyledTableCell align="center">Ações</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.PRO_ID}>
                  <StyledTableCell component="th" scope="row" align="left">
                    {row.PRO_NAME}
                  </StyledTableCell>
                  <If condition={ this.props.productToEdit 
                                  && this.props.productToEdit.PRO_ID !== row.PRO_ID }
                  >
                  <Then>
                    <StyledTableCell align="left">{row.PRO_DESCRIPTION}</StyledTableCell>
                    <StyledTableCell align="right">{row.PRO_PRICE}</StyledTableCell>
                    <StyledTableCell align="right">{row.PRO_QUANTITY}</StyledTableCell>
                    
                    <When condition={row.PRO_QUANTITY > 0 && row.PRO_QUANTITY <= 20}>
                      <StyledTableCell align="center">
                        <Badge color="secondary" badgeContent="">
                          <Typography>CRÍTICO</Typography>
                        </Badge>
                      </StyledTableCell>
                    </When>

                    <When condition={row.PRO_QUANTITY > 21 && row.PRO_QUANTITY <= 50}>
                    <StyledTableCell align="center">
                        <Badge  color="error" badgeContent="">
                          <Typography>ALERTA</Typography>
                        </Badge>
                      </StyledTableCell>
                    </When>

                    <When condition={row.PRO_QUANTITY >= 51}>
                    <StyledTableCell align="center">
                        <Badge color="primary" badgeContent="">
                          <Typography>OK</Typography>
                        </Badge>
                      </StyledTableCell>
                    </When>
                      
                    <StyledTableCell align="right">
                      <Button variant="contained" color="secondary" onClick={() => {selectProductToDelete(row)}}>
                        Remover
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained" color="default" /*onClick={() => {editProduct(row)}}*/>
                        Editar
                      </Button>
                    </StyledTableCell>
                  </Then>
                  <Else>
                    <StyledTableCell>Deseja deletar este produto?</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant="contained" color="secondary" onClick={() => {deleteProduct(row)}}>
                        SIM
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained" color="default" onClick={cancelDeleteProduct}>
                        NÃO
                      </Button>
                    </StyledTableCell>
                  </Else>
                </If>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        : <div><h3>Editando Produtos</h3></div>
        }
      </TableContainer>
    );
  }
}

export default CustomizedTable;
