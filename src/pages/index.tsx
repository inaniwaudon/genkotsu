import { useEffect, useState } from "react";
import Script from "next/script";
import Head from "next/head";
import styled from "styled-components";
import GenkotsuDrawer from "@/components/GenkotsuDrawer";

const Main = styled.main`
  font-family: sans-serif;
  margin: 32px;
`;

const Input = styled.input`
  max-width: 100%;
  font-size: 48px;
  font-family: "keifont";
  margin-bottom: 24px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: solid 1px #ccc;
`;

const Footer = styled.footer`
  margin-top: 16px;
`;

const Anchor = styled.a`
  color: #666;
  text-underline-offset: 4px;
`;

const SnsParagraph = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Index = () => {
  const [text, setText] = useState("げんこつ");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>げんこつ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="げんこつ" />
        <meta property="og:description" content="みさえ〜〜" />
        <meta
          property="og:url"
          content="https://inaniwaudon.github.io/genkotsu/"
        />
        <meta property="og:site_name" content="げんこつ" />
        <meta
          property="og:image"
          content="https://inaniwaudon.github.io/genkotsu/genkotsu.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://inaniwaudon.github.io/genkotsu/genkotsu.png"
        />
      </Head>
      <Main>
        <div>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
        </div>
        <GenkotsuDrawer text={text} />
        <Footer>
          <p>
            表示用に「
            <Anchor href="http://font.sumomo.ne.jp/font_1.html">
              けいふぉんと
            </Anchor>
            」を使用しています。The keifont, that is included in this site, is
            distributed in{" "}
            <Anchor href="https://licenses.opensource.jp/Apache-2.0/Apache-2.0.html">
              the Apache License 2.0
            </Anchor>
          </p>
          <p>
            また、GIF 生成のライブラリとして{" "}
            <Anchor href="https://jnordberg.github.io/gif.js/">gif.js</Anchor>{" "}
            を使用しています。
            <Anchor href="https://licenses.opensource.jp/MIT/MIT.html">
              The MIT License (MIT)
            </Anchor>{" "}
            Copyright (c) 2013 Johan Nordberg
          </p>
          <SnsParagraph>
            <Anchor href="https://github.com/inaniwaudon/genkotsu">
              GitHub
            </Anchor>
            {isClient && (
              <>
                <a
                  href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                  className="twitter-share-button"
                  data-show-count="false"
                >
                  Tweet
                </a>
              </>
            )}
            <Script async src="https://platform.twitter.com/widgets.js" />
          </SnsParagraph>
          <Script src="/gif.js" />
        </Footer>
      </Main>
    </>
  );
};

export default Index;
