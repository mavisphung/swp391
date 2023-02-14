import CommentRow from "./CommentRow";

import Comment from "~/models/Comment";

function ListComment({ list }) {
  list = list
    ? list
    : [
        new Comment(
          "Huy Phùng",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRickUDWUxIbW2iAfldUHuXB3Rt8gvhWCKnSw&usqp=CAU",
          5,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum curabitur vitae nunc sed velit dignissim sodales ut.",
          "10:10 Sáng, Hôm nay"
        ),
        new Comment(
          "Nguyễn Phùng Phương Ba",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRickUDWUxIbW2iAfldUHuXB3Rt8gvhWCKnSw&usqp=CAU",
          3,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum curabitur vitae nunc sed velit dignissim sodales ut.",
          "10:10 Sáng, 29/12/2023"
        ),
        new Comment(
          "Khách hàng ẩn danh",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRickUDWUxIbW2iAfldUHuXB3Rt8gvhWCKnSw&usqp=CAU",
          3.5,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum curabitur vitae nunc sed velit dignissim sodales ut.",
          "12:22 Chiều, 12/11/2022"
        ),
      ];
  return (
    <div>
      {list.map((c) => {
        return (
          <CommentRow
            name={c.name}
            img={c.img}
            rating={c.rating}
            com={c.com}
            date={c.date}
          />
        );
      })}
    </div>
  );
}

export default ListComment;
