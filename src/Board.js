import React from 'react'
import Square from './Square'
import { calculateWinner } from './Helper'

export default class Board extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null, 
        }
    }

    handleClick(i)
    {
        const squares = this.state.squares.slice()

        const cannotClick = calculateWinner(squares) || squares[i]
        if(cannotClick) return

        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        })
    }

    renderSquare(i) 
    {
        return <Square 
            value={ this.state.squares[i] } 
            onClick={ () => this.handleClick(i) }
            />
    }

    render() 
    {
        const winner = calculateWinner(this.state.squares)
        const status = winner ? `Winner: ${ winner }`
            : `Next player: ${ this.state.xIsNext ? 'X' : 'O' }`

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}