"use client";
import Button from "react-bootstrap/Button";

type props = {
    children: React.ReactNode;
    color: string;
};

export default function ButtonLink(props: props) {
    return <Button variant={props.color}>{props.children}</Button>;
}
