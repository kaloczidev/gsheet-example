import * as React from "react"
import {useEffect, useState} from "react";

import {Helmet} from 'react-helmet';

import '../styles.scss';

const IndexPage = () => {

    const [header, setHeader] = useState([]);
    const [rows, setRows] = useState([]);
    const [title, setTitle] = useState('sheet title');

    useEffect(() => {
        fetch('/.netlify/functions/items')
            .then(r => r.json())
            .then(r => {
                const table = r.table;
                setHeader(table.headers);
                setRows(table.rows);
                setTitle(table.title);
            });
    }, [])
    return (
        <main>
            <Helmet>
                <title>Google sheet example</title>
            </Helmet>

            <h1>Google sheet example</h1>
            <h2>{title}</h2>
            <hr/>
            <table>
                <thead>
                <tr>{header?.length && header.map(head => <th key={`header-${head}`}> {head}</th>)}</tr>
                </thead>

                <tbody>
                {rows?.length && rows.map((row, index) => <tr key={`row-${index}`}>
                    {header.map(head => <td key={`cell-${head}-index`}> {row[head].stringValue}</td>)}
                </tr>)}
                </tbody>
            </table>

        </main>
    )
}

export default IndexPage
