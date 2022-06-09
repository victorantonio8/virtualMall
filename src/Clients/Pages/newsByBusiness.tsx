import React, { useEffect, useState } from "react";
import { Collapse, Image, Card } from "antd";
import { getNewsByBusiness } from "../../api/newsApi";
import { news } from "../Models/newsModel";

export default function NewsByBusiness() {
  const [news, setNews] = useState<any[] | null>();
  const [visible, setVisible] = useState(false);
  const { Panel } = Collapse;

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    getNewsByBusiness().then((data) => {
      setNews(data as news[]);
    });
  }, []);

  return (
    <>
      <div>
        {news && (
          <div>
            {news.map((business, index) => (
              <Collapse
                bordered={false}
                key={business.id}
                defaultActiveKey={[0]}
              >
                <Panel
                  header={business.name}
                  style={{ fontWeight: "bold" }}
                  key={index}
                >
                  <div
                    style={{
                      display: "flex",
                      maxWidth: "1400px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    {business.news.map((news: news) => (
                      <Card
                        style={{
                          width: 500,
                          height:370,
                          margin: "10px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        key={news.id}
                        cover={
                          <img
                            alt="example"
                            // onClick={(event) => handleClick(data.id)}
                            src={news.urlPicture}
                          />
                        }
                      ></Card>
                    ))}
                  </div>
                </Panel>
              </Collapse>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
