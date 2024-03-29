# Generated by Django 3.2.22 on 2024-02-05 00:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_rating', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reciperating',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reciperating',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
