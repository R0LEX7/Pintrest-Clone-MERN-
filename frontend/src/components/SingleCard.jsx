import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import useSinglePost from "../Custom Hooks/useSinglePost";
import { FaRegComment } from "react-icons/fa6";

export default function SingleCard() {
  const { id } = useParams();
  const { post } = useSinglePost({ id });

  console.log(post);

  const timestamp = new Date(post?.createdAt);

  // Format the date as a string
  const formattedDate = timestamp.toLocaleString();

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 "
      shadow="sm"
      width="800px"
    >
      <CardBody>
        <div
          className="flex flex-col  w-[1366px] gap-8 md:gap-4 items-center "
          style={{ width: "", justifyContent: "space-around" }}
        >
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              shadow="md"
              src={post?.image}
              width="100%"
            />
          </div>

          <div
            className="flex flex-1  flex-col  text-black col-span-6 md:col-span-8"
            width="300px"
            style={{ width: "400px" }}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">
                  {post?.userId?.username}
                </h3>
                <h1 className="text-large font-medium mt-2">
                  {post?.postText}
                </h1>
                <p className="text-small text-foreground/80">{formattedDate}</p>
              </div>
              {/* <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button> */}
            </div>

            <div className="flex flex-1 flex-col mt-3 gap-1">
              <Slider
                aria-label="Music progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                color="foreground"
                defaultValue={33}
                size="sm"
              />
              <div className="flex justify-between">
                <p className="text-small">1:23</p>
                <p className="text-small text-foreground/50">4:32</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <FaRegComment />
                {post.comments.length}
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
