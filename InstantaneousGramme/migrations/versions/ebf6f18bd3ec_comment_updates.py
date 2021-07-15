"""comment updates

Revision ID: ebf6f18bd3ec
Revises: 733ffceee29b
Create Date: 2021-04-08 03:53:42.777424

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebf6f18bd3ec'
down_revision = '733ffceee29b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('comments', 'postId', new_column_name='post_id')
    op.alter_column('comments', 'userId', new_column_name='user_id')
    op.alter_column('comments', 'content', type_=sa.Text)
    op.drop_constraint('comments_postId_fkey', 'comments', type_='foreignkey')
    op.drop_constraint('comments_userId_fkey', 'comments', type_='foreignkey')
    op.create_foreign_key(
        'comments_user_id_fkey', 'comments', 'users', ['user_id'], ['id'])
    op.create_foreign_key(
        'comments_post_id_fkey', 'comments', 'posts', ['post_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('comments', 'post_id', new_column_name='postId')
    op.alter_column('comments', 'user_id', new_column_name='userId')
    op.alter_column('comments', 'content', type_=sa.String)
    op.drop_constraint('comments_user_id_fkey', 'comments', type_='foreignkey')
    op.drop_constraint('comments_post_id_fkey', 'comments', type_='foreignkey')
    op.create_foreign_key('comments_userId_fkey', 'comments', 'users',
                          ['userId'], ['id'])
    op.create_foreign_key('comments_postId_fkey', 'comments', 'posts',
                          ['postId'], ['id'])
    # ### end Alembic commands ###