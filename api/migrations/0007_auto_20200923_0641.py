# Generated by Django 3.0.6 on 2020-09-23 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20200923_0242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.CharField(default='description not available', max_length=300),
        ),
    ]
