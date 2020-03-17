import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
    // state = blogPosts: []
    // action = type: add, edit, delete; payload
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;
        // case 'add_blogpost':
        //     return [
        //         ...state, 
        //         { 
        //             id: Math.floor(Math.random() * 99999), 
        //             title: action.payload.title,
        //             content: action.payload.content
        //         }
        //     ];
        case 'delete_blogpost':
            return state.filter(item => item.id !== action.payload);
        case 'edit_blogpost':
            return state.map(item => {
                return item.id === action.payload.id ? action.payload : item;
            });
        default:
            return state;
    }
}

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({type: 'get_blogposts', payload: response.data})
    }
}

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', {title, content});
        // dispatch({type: 'add_blogpost', payload: {title, content}});
        
        if (callback) {
            callback();
        }
    };
}

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({type: 'delete_blogpost', payload: id});
    }
}

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title, content});

        dispatch({type: 'edit_blogpost', payload: {id, title, content}});
        
        if (callback) {
            callback();
        }
    }
}

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost },
    []
);






/*
// Step 2: userReducer
import React, { useReducer } from 'react';

const BlogContext = React.createContext();


const blogReducer = (state, action) => {
    // state = blogPosts: []
    // action = type: add, edit, delete; payload
    switch (action.type) {
        case 'add_blogpost':
            return [...state, { title: `Blog Post #${state.length + 1}`}];
        default:
            return state;
    }
}

export const BlogProvider = ({ children }) => {
    const [blogPosts, dispatch] = useReducer(blogReducer, []);

    const addBlogPost = () => {
        dispatch({type: 'add_blogpost'})
    }

    return <BlogContext.Provider value={{data: blogPosts, addBlogPost}}>
        {children}
    </BlogContext.Provider>;
};

export default BlogContext;
*/

/*
// Step 1: useState
import React, { useState } from 'react';

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState([]);

    const addBlogPost = () => {
        setBlogPosts([...blogPosts, { title: `Blog Post #${blogPosts.length + 1}`}]);
    }

    return <BlogContext.Provider value={{data: blogPosts, addBlogPost}}>
        {children}
    </BlogContext.Provider>;
};

export default BlogContext;

*/