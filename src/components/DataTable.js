const { Image, Table, Popup } = require('semantic-ui-react');
const { BsFillLockFill, BsFillUnlockFill } = require('react-icons/bs');
const baseUrl = 'https://forum.freecodecamp.org';
const baseUserUrl = 'https://www.freecodecamp.org/forum/u/'

export const DataTable = ({ data }) => (
    <Table celled striped inverted textAlign='center'>
        <Table.Header id='table-header'>
            <Table.Row>
                <Table.HeaderCell collapsing content='#' />
                <Table.HeaderCell content='Topic' />
                <Table.HeaderCell width={4} content='Commenters' />
                <Table.HeaderCell collapsing content='Replies' />
                <Table.HeaderCell collapsing content='Views' />
                <Table.HeaderCell collapsing content='Status' />
                <Table.HeaderCell width={2} content='Active' />
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {
                data.map((d, i) => (
                    <Table.Row key={i}>
                        <Table.Cell id='num-col' content={i + 1} />
                        <Table.Cell
                            id='title-col'
                            content={
                                <a
                                    href={baseUrl + '/t/' + d.topic_link}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {d.title}
                                </a>}
                        />
                        <Table.Cell
                            content={
                                <div style={{ display: 'inline-flex' }}>
                                    {
                                        d.posters.map((poster, posterIdx) => {
                                            const re = /({size})/;
                                            const imgSrc = poster.avatar_template.replace(re, '16');
                                            return (
                                                <Popup
                                                    inverted
                                                    position='top center'
                                                    content={poster.username}
                                                    key={posterIdx}
                                                    trigger={
                                                        <Image
                                                            src={baseUrl + imgSrc}
                                                            href={baseUserUrl + poster.username}
                                                            target='_blank'
                                                            style={{ marginRight: '5px' }}
                                                        />
                                                    }
                                                />

                                            )
                                        })

                                    }

                                </div>
                            }
                        />
                        <Table.Cell id='reply-col' content={d.replies} />
                        <Table.Cell id='view-col' content={kFormatter(d.views)}
                        />
                        <Table.Cell id='status-col' content={!d.status ? <BsFillUnlockFill /> : <BsFillLockFill />} />
                        <Table.Cell id='active-col' content={d.active} />
                    </Table.Row>
                ))
            }
        </Table.Body>
    </Table>
);

const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num);
};