# Generated by Django 3.2.9 on 2021-12-09 13:50

import ckeditor_uploader.fields
from django.db import migrations, models
import django.db.models.deletion
import hitcount.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('oauth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('Q', 'Question'), ('F', 'Feedback'), ('S', 'Suggestion'), ('I', 'Improvement')], default='Q', max_length=3)),
                ('title', models.CharField(max_length=256)),
                ('content', ckeditor_uploader.fields.RichTextUploadingField()),
                ('tags', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='oauth.userprofile', verbose_name='author of topic')),
                ('upvotes', models.ManyToManyField(blank=True, related_name='topic_upvotes', to='oauth.UserProfile')),
            ],
            options={
                'ordering': ['-created_at'],
            },
            bases=(models.Model, hitcount.models.HitCountMixin),
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', ckeditor_uploader.fields.RichTextUploadingField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='oauth.userprofile', verbose_name='author of answer')),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forum.topic', verbose_name='topic of answer')),
                ('upvotes', models.ManyToManyField(blank=True, related_name='answer_upvotes', to='oauth.UserProfile')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
