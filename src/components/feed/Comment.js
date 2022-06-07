// import sanitizeHtml from "sanitize-html";
import React from "react";
import styled from "styled-components";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 7px;
  position: relative;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const DeleteBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: inherit;
  position: absolute;
  right: 0;
  bottom: 1px;
  font-size: 11px;
  opacity: 0.4;
`;

function Comment({ id, photoId, author, payload, isMine }) {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  //   const cleanedPayload = sanitizeHtml(
  //     payload?.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),
  //     { allowedTags: ["mark"] }
  //   );
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      {/* <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      /> */}
      <CommentCaption>
        {payload.split(" ").map((word, index) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <DeleteBtn onClick={onDeleteClick}>delete</DeleteBtn> : null}
    </CommentContainer>
  );
}

Comment.propTypes = {
  id: PropTypes.number,
  isMine: PropTypes.bool,
  photoId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string,
};

export default Comment;
