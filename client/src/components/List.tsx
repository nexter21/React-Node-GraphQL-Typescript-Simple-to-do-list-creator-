import React, { useEffect, useState } from 'react';

interface listType {
  _id: string;
  data: string;
}
interface ListProps {
  data: String;
}
const List = (props: ListProps) => {
  const [mainList, setMainList] = useState<listType[]>([]);
  const [isRemoved, setIsRemoved] = useState(false);
  const [editId, setEditId] = useState('');
  const [editText, setEditText] = useState('');

  useEffect(() => {
    getList();
  }, [props.data, isRemoved, editText]);

  const getList = async () => {
    const graphqlQuery = {
      query: `{
        getAllItems {
          _id
          data
        }
      }`,
    };

    const res = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
    });

    const lists = await res.json();
    setMainList(lists.data.getAllItems);
  };

  const deleteItem = async (id: string) => {
    const graphqlQuery = {
      query: `mutation deleteItem($id: ID!){
        deleteItem(id: $id)
      }`,
      variables: {
        id,
      },
    };

    const res = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
    });

    const delRes = await res.json();
    if (delRes.data.deleteItem) {
      setIsRemoved(!isRemoved);
    }
  };

  const editItem = (id: string, data: string) => {
    const editArea = document.getElementById('editBox') as HTMLDivElement;
    setEditText(data);
    setEditId(id);
    editArea.setAttribute('style', 'display: block');
  };

  const editItemData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const graphqlQuery = {
      query: `mutation ($id: ID!, $data: String!) {
        editItem(id: $id, item: {data: $data }) {
          data
        }
      }`,
      variables: {
        id: editId,
        data: editText,
      },
    };

    const res = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
    });

    const editRes = await res.json();

    const editArea = document.getElementById('editBox') as HTMLDivElement;
    editArea.removeAttribute('style');
    setEditText('');
  };
  return (
    <div className="listArea">
      <div className="editBox" id="editBox">
        <i className="fa fa-times" aria-hidden="true"></i>
        <form onSubmit={editItemData}>
          <input
            type="text"
            placeholder="new item content"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button id="editBtn">Submit</button>
        </form>
      </div>
      <ul className="lists">
        {mainList.map((list) => {
          return (
            <li className="lists__item" key={list._id}>
              <div>{list.data}</div>
              <div className="buttons">
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  id="edit"
                  onClick={() => editItem(list._id, list.data)}
                ></i>
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  onClick={() => deleteItem(list._id)}
                ></i>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
