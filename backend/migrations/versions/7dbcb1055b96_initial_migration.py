"""initial migration

Revision ID: 7dbcb1055b96
Revises: 
Create Date: 2021-06-16 20:40:45.741846

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7dbcb1055b96'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('subjects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('subject_number', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('volume', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('subject_number')
    )
    op.create_table('beats',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('subject_id', sa.Integer(), nullable=False),
    sa.Column('sound_name', sa.Text(), nullable=False),
    sa.Column('category', sa.String(length=20), nullable=True),
    sa.Column('carrier_freq', sa.Integer(), nullable=False),
    sa.Column('band_freq', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['subject_id'], ['subjects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ratings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('subject_id', sa.Integer(), nullable=False),
    sa.Column('sound_name', sa.Text(), nullable=False),
    sa.Column('category', sa.String(length=20), nullable=True),
    sa.Column('order', sa.String(length=10), nullable=False),
    sa.Column('arousal', sa.Integer(), nullable=False),
    sa.Column('dominance', sa.Integer(), nullable=False),
    sa.Column('valence', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['subject_id'], ['subjects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ratings')
    op.drop_table('beats')
    op.drop_table('subjects')
    # ### end Alembic commands ###
