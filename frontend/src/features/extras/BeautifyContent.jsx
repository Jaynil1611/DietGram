import reactStringReplace from "react-string-replace";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

function BeautifyContent({ content }) {
  let replacedContent = reactStringReplace(content, /@(\w+)/g, (match, i) => (
    <Link key={match + i} to={`/${match}`}>
      @{match}
    </Link>
  ));

  replacedContent = reactStringReplace(
    replacedContent,
    /#(\w+)/g,
    (match, i) => (
      <Link key={match + i} to={`/hashtag/${match}`}>
        #{match}
      </Link>
    )
  );

  replacedContent = reactStringReplace(
    replacedContent,
    /(https?:\/\/\S+)/g,
    (match, i) => (
      <a key={match + i} href={match} target="_blank" rel="noreferrer">
        {match}
      </a>
    )
  );

  return <Text>{replacedContent}</Text>;
}

export default BeautifyContent;
