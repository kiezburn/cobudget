import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";

import TextField from "components/TextField";
import Button from "components/Button";
import Avatar from "components/Avatar";

const ADD_COMMENT = gql`
  mutation addComment($content: String!, $dreamId: ID!) {
    addComment(content: $content, dreamId: $dreamId) {
      id
      numberOfComments
      comments {
        id
        discourseUsername
        cooked
        raw
        createdAt
        orgMember {
          id
          user {
            id
            username
            avatar
          }
        }
      }
    }
  }
`;

function AddComment({ currentOrgMember, currentOrg, dreamId, event }) {
  const [addComment, { loading }] = useMutation(ADD_COMMENT);
  const [content, setContent] = React.useState("");
  const { handleSubmit, register, errors } = useForm();
  const inputRef = React.useRef();

  if (currentOrg.discourse && !currentOrgMember.hasDiscourseApiKey) {
    //TODO: Fix button/link to look nice
    return (
      <div>
        <h2>You need to connect to a discourse account</h2>
        <Link href={"/connect-discourse"}>
          <a>Connect to Discourse</a>
        </Link>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(() => {
        addComment({ variables: { content, dreamId } })
          .then(() => {
            inputRef.current.blur();
            setContent("");
          })
          .catch((err) => alert(err.message));
      })}
    >
      <div className="flex">
        <div className="mr-4">
          <Avatar user={currentOrgMember.user} />
        </div>
        <div className="flex-grow">
          <div className="mb-2">
            <TextField
              name="content"
              placeholder="Add comment"
              multiline
              rows={1}
              error={Boolean(errors.content)}
              helperText={errors.content?.message}
              value={content}
              inputProps={{
                value: content,
                onChange: (e) => setContent(e.target.value),
              }}
              inputRef={(e) => {
                register({ required: "Required" });
                inputRef.current = e;
              }}
              color={event.color}
            />
          </div>
          {content.length > 0 && (
            <div className="flex justify-end">
              <Button
                onClick={() => setContent("")}
                variant="secondary"
                color={event.color}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={content.length === 0}
                color={event.color}
                loading={loading}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default AddComment;
