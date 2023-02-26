import React from "react"
import { Card, Icon, Image } from "semantic-ui-react"
import { SongPostModal } from "./SongPostModal"
import Taylor from "../../assets/midnights-sample.png"

const PostPreviewCard = ({
  img,
  date,
  isCardModalVisible,
  setIsCardModalVisible,
}) => (
  <>
    <Card
      style={{ width: "150px", marginRight: "5px", marginLeft: "5px" }}
      onClick={() => setIsCardModalVisible(true)}
    >
      <Image src={img} wrapped ui={false} />
      <Card.Content>
        <Card.Header
          style={{ color: "white", textAlign: "center", fontSize: "12px" }}
        >
          <p>{date}</p>
        </Card.Header>
      </Card.Content>
    </Card>
    <SongPostModal
      isModalVisible={isCardModalVisible}
      setIsModalVisible={setIsCardModalVisible}
      username={"exrlla"}
      spotifyCover={Taylor}
      userDescription={"Something about.. men. "}
      artist={"Taylor Swift"}
      song={"Midnight"}
      time={"13:48"}
    />
  </>
)

export { PostPreviewCard }
