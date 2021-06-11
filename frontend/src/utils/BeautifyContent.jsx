import React from "react";
import * as linkify from "linkifyjs";
import Linkify from "linkifyjs/react";
import hashtag from "linkifyjs/plugins/hashtag";
import mention from "linkifyjs/plugins/mention";
hashtag(linkify);
mention(linkify);

function BeautifyContent({ content }) {
  return <Linkify>{content}</Linkify>;
}

export default BeautifyContent;
