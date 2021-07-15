from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phoneNumber = db.Column(db.String(20))
    username = db.Column(db.String(30), unique=True, nullable=False)
    biography = db.Column(db.String(200))
    profilePicture = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    date_created = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(
        db.DateTime,  default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp())

    posts = db.relationship("Post", back_populates="user")
    postLikes = db.relationship("PostLike", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    commentLikes = db.relationship("CommentLike", back_populates="user")
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.followed_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )

    messages_sent = db.relationship(
        "DirectMessage", foreign_keys="DirectMessage.senderId",
        back_populates="sender"
    )
    messages_received = db.relationship(
        "DirectMessage", foreign_keys="DirectMessage.receiverId",
        back_populates="receiver"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profilePicture": self.profilePicture,
            "biography": self.biography,
        }
